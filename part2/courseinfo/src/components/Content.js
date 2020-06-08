import React from 'react'

import Part from './Part'

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(entry =>
                <Part key={entry.id} part={entry} />
            )}
        </div>
    )
}

export default Content