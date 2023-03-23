import React from 'react'
import { Calender } from '~/components'

function CalenderPage() {
  return (
    <div className="sm:p-6 md:p-2">
      <div className=" text-2xl font-semibold pb-4">
        <h3 className="p-6 pb-0">Full School Callender</h3>
      </div>
      <Calender full={true} user={null} />
    </div>
  );
}

export default CalenderPage