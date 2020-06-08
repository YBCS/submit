import React from 'react'

import Header from './Header'
import Content from './Content'
import Total from './Total'

// NB : 

const Course = ({ course }) => {
    return (
        <div>
            {course.map(entry =>
                <div key={entry.id}>
                    <Header course={entry} />
                    {/* <Content key={entry.parts.id} course={entry} />  */}
                    <Content course={entry} />
                    <Total course={entry} />
                </div>
            )}
        </div>
    )
}

export default Course