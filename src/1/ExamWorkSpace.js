import "./exam.css";
import Swal from "sweetalert2";
import examimage from '../example.png';
import {ScoreContext} from '../App.js';
import {Link} from 'react-router-dom';

import { useCallback, useContext, useEffect, useRef, useState } from "react";

const INITIAL_INFO = {
    radius: 15
};

const INITIAL_CLICK_INFO = {
    curX: 0,
    curY:0,
    active: false
};


export default function ExamWorkSpace(props) {

    const {setScore} = useContext(ScoreContext);
    const { exam: { name, gridCount, positionList } } = props;
    const { radius } = INITIAL_INFO;
    const examCvsRef = useRef(null);
    const writeCvsRef = useRef(null);
    const cvsGridInfo = useRef({
        exam: {
            pointList: [[0,0]]
        },
        write: {
            pointList: [[0,0]],
            lineList: [],
        }
    });
    const clickInfo = useRef(INITIAL_CLICK_INFO);
    
    const getCvsInfo = (cvsType) => {
        const examCvs = examCvsRef.current;
        const writeCvs = writeCvsRef.current;
        if(!examCvs || !writeCvs) return {
            cvs: null,
            ctx: null
        };

        const examCtx = examCvs.getContext('2d');
        const writeCtx = writeCvs.getContext('2d');
        const isExam = cvsType === 'exam';
        return {
            cvs: isExam ? examCvs : writeCvs,
            ctx: isExam ? examCtx : writeCtx
        }
    }
    
    const [isSuccess, setSuccess] = useState(false);
    
    const makeGridLine = useCallback((cvsType, lineCount) => {
        const { cvs, ctx } = getCvsInfo(cvsType);
        const { width, height } = cvs;
        const info = cvsGridInfo.current[cvsType];
        const emptyArray = Array.from(Array(lineCount)).fill(1);
        const XIncreaseNum = width / lineCount; 
        const YIncreaseNum = height / lineCount; 
        let lastX = 0, lastY = 0;

        ctx.strokeStyle = "black";
        ctx.strokeWidth = 1;
        
        emptyArray.forEach((_, idx) => {
            let [x, y] = [lastX, lastY];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + height)
            ctx.stroke();
            ctx.closePath();
            
            x += XIncreaseNum;
            info.pointList.push([x, y]);
            emptyArray.forEach((_, subIdx) => {
                info.pointList.push([x, YIncreaseNum * (subIdx + 1)]);
            })
            lastX = x;
            lastY = y;
        })

        lastX = 0;
        lastY = 0;
        emptyArray.forEach((_, idx) => {
            let [x, y] = [lastX, lastY];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y)
            ctx.stroke();
            ctx.closePath();

            y += YIncreaseNum;
            info.pointList.push([x, y]);
            emptyArray.forEach((_, subIdx) => {
                info.pointList.push([XIncreaseNum * (subIdx + 1), y]);
            })
            lastX = x;
            lastY = y;
        });

        info.pointList = info.pointList.reduce((acc, item) => {
            if(acc.findIndex(subItem => ((item[0] === subItem[0]) && (item[1] === subItem[1]))) !== -1) return acc;
            
            acc.push(item);
            return acc;
        }, []);

    }, []);

    const getPos = (event) => ([event.x - event.target.offsetLeft, event.y - event.target.offsetTop]);
    
    const findClickArea = (cvsType = 'exam', event) => {
        const { pointList } = cvsGridInfo.current[cvsType] ?? {};
        const [x, y] = getPos((event));

        return pointList.findIndex(([arcX, arcY]) => {
            const dx = x - arcX;
            const dy = y - arcY;
            return (dx * dx + dy * dy) <= (radius * radius);
        })
    }
    
    useEffect(() => {
        if(!getCvsInfo('exam')?.cvs) return () => {};
        const lineCount = Math.ceil(gridCount / 2);

        makeGridLine('exam', lineCount);
        makeGridLine('write', lineCount);
        
        const reverseXY = (cvsType, x, y) => {
            const { cvs } = getCvsInfo(cvsType);
            const XIncreaseNum = cvs.width / lineCount;
            const YIncreaseNum = cvs.height / lineCount;
            const reverseX = ((lineCount ) - Math.ceil(x / XIncreaseNum)) * XIncreaseNum;
            const reverseY = ((lineCount) - Math.ceil(y / YIncreaseNum)) * YIncreaseNum
            return [reverseX, reverseY];
        }
        
        (() => {
            const { cvs, ctx } = getCvsInfo('exam');
            ctx.strokeStyle = "blue"; 
            ctx.strokeWidth = 2;
            
            positionList.map((item) => {
                const [curX, curY, x, y] = item;
                return [...reverseXY('exam', curX, curY), ...reverseXY('exam', x, y)]
            }).forEach(item => {
                const [curX, curY, x, y] = item;
                ctx.beginPath();
                ctx.moveTo(curX, curY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.closePath();
            })
        })();
        
        const writeCvsEvent = () => {
            const { cvs, ctx } = getCvsInfo("write");
            
            cvs.addEventListener("mousedown", (event) => {

                const idx = findClickArea('write', event);
                if(idx === -1) return;
                
                
                const [curX, curY] = cvsGridInfo.current['write'].pointList[idx];
                clickInfo.current = {
                    active: true,
                    curX,
                    curY
                };
            })

            const redraw = (cvsType = 'write') => {
                const { cvs, ctx } = getCvsInfo(cvsType);
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                makeGridLine('write', lineCount);
                ctx.strokeStyle = "red";
                ctx.strokeWidth = 2;
                cvsGridInfo.current.write.lineList.forEach(item => {
                    const [curX, curY, x, y] = item;
                    ctx.beginPath();
                    ctx.moveTo(curX, curY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.closePath();
                })
            }
            
            cvs.addEventListener("mousemove", (event) => {
                if(!clickInfo.current.active) return;
                const { curX, curY }  = clickInfo.current;
                const [x,y] = getPos(event);
                
                const idx = findClickArea('write', event);
                if(idx !== -1) {
                    const [pointX, pointY] = cvsGridInfo.current.write.pointList[idx];
                    const findIndex = cvsGridInfo.current.write.lineList.findIndex(item => {
                        return (
                            curX === item[0] &&
                            curY === item[1] &&
                            pointX === item[2] &&
                            pointY === item[3]
                        );
                    });
                    console.log('findIndex', findIndex)
                    
                    if (findIndex !== -1) {
                        redraw();
                        return;
                    }
                    cvsGridInfo.current.write.lineList.push([curX, curY, pointX,  pointY]);
                    clickInfo.current.curX = pointX;
                    clickInfo.current.curY = pointY;
                    redraw();
                    return;
                }
                
                redraw();
                ctx.strokeWidth = 2;
                ctx.strokeStyle = 'red';
                ctx.beginPath();
                ctx.moveTo(curX, curY);
                ctx.lineTo(x,  y);
                ctx.stroke();
                ctx.closePath();
            })

            const endCheck = () => {
                const checkLineList = JSON.parse(JSON.stringify(cvsGridInfo.current.write.lineList));
                cvsGridInfo.current.write.lineList = [];
                redraw();
                clickInfo.current = INITIAL_CLICK_INFO;
                
                const errorMessage = '모양이 일치하지 않습니다. 다시 시도해 주세요.';
                if (positionList.length !== checkLineList.length) {
                    redraw();
                    return alert(errorMessage);
                }
                
                const isSame = JSON.parse(JSON.stringify(positionList)).reduce((acc, item) => {
                    if(checkLineList.findIndex(subItem => {
                        return (
                            item[0] === subItem[0] &&
                            item[1] === subItem[1] &&
                            item[2] === subItem[2] &&
                            item[3] === subItem[3]
                        );
                    }) !== -1) acc.push(true);
                    return acc;
                }, []).length === positionList.length;
                
                
                if (isSame) {
                    alert("성공이에요!! 축하합니다!!");
                    setSuccess(true);
                } else {
                    alert(errorMessage);
                    redraw();
                }
            }
            
            cvs.addEventListener("mouseup", endCheck)
            
            cvs.addEventListener("mouseout", (event) => {
                if(clickInfo.current.active) endCheck()
            })
        }
        writeCvsEvent();
        
    }, []);
    
    useEffect(() => {
        if (isSuccess) {
            console.log('성공!!');
            setScore(prevScore => prevScore + 100);
        }
    }, [isSuccess]);
    
    return(
    <div>
    
    <div className="image">
    <img src={examimage}></img>
    </div>
    <div className={'workspace-container'}>
        <canvas ref={examCvsRef} width={400} height={400} className={'workspace exam-workspace'}></canvas>
        <canvas ref={writeCvsRef} width={400} height={400} className={'workspace write-workspace'}></canvas>
    </div>
    <Link to={'/page2'}  className="link-button" >다음 문제</Link>
    </div>
    ); 
    
}
