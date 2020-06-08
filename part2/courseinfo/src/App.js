import React from 'react'

import Course from './components/Course'

const App = ({ courses }) => {

    return (
        <div>
            <h1>Web development curriculum</h1>
            <Course course={courses} />
        </div>
    )
}

export default App