import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp = (props) => {

  // date state
  // const [range, setRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection'
  //   }
  // ])

  // open close
  const [open, setOpen] = useState(true)

  // get the target element to toggle 
  const refOne = useRef(null)

  
  return (
    <div className="calendarWrap">

      {/* <input
        value={`Du ${format(range[0].startDate, "MM/dd/yyyy")} au ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        // onClick={ (event) =>  {setOpen(open => !open); toggleDisplay()}}
      /> */}

      <div ref={refOne}>
        {open && 
          <DateRange
            onChange={item => props.setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={props.range}
            months={1}
            direction="vertical"
            className="calendarElement"
          />
        }
        
        {console.log("test:"+(props.range[0].endDate - props.range[0].startDate) / (1000 * 3600 * 24))}
      </div>

    </div>
  )
}


export default DateRangeComp