import FlipNumbers from 'react-flip-numbers';
import React from 'react';

function Flips({d, h, hd, days, hours, mins, secs}){
    if(d.getMonth() === hd.getMonth() && d.getDate() === hd.getDate()){
        return <div className='celebrate'>{'IT\'S '+h.toUpperCase()+'!'}</div>
    }
    let ret = ['','','','']
    let tDigs = [hours, mins, secs]
    let r = formatCount()

    function formatCount(){
        if (days < 100 && days >= 10){
            ret[0] = '0'+days.toString()
        } else if (days < 10){
            ret[0] = '00'+days.toString()
        } else {
            ret[0] = days.toString()
        }
        for (let i = 0; i < tDigs.length; i++){
            if (tDigs[i] < 10){
                ret[i+1] = '0' + tDigs[i].toString()
            } else {
                ret[i+1] = tDigs[i].toString()
            }
        }
        return ret[0]+':'+ret[1]+':'+ret[2]+':'+ret[3]
    }

    return (
        <div className='clock'>
            <span className='time-tag-one'>Days</span>
            <span className='time-tag-two'>Hours</span>
            <span className='time-tag-three'>Mins</span>
            <span className='time-tag-four'> Secs</span>
            <div className='numbers'>
                <FlipNumbers play
                             width          = {50} 
                             height         = {50} 
                             numbers        = {r}
                             nonNumberStyle = {{fontSize: '50px'}}/>
            </div> 
        </div>
    )
}

export default Flips;