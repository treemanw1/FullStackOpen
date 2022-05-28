import React from 'react'

const Course = ({ course }) => {
    const total = course.parts.reduce((s, p) => {
        return s + p.exercises
      }, 0)

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <b>total of {total} exercises</b>
        </div>
    )
}

const Header = ({ course }) => 
<div>
    <h2>{course.name}</h2>
</div>

const Content = ({ parts }) => 
<div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
</div>

const Part = ({ name, exercises }) => 
<div>
    <p>
    {name} {exercises}
    </p>
</div>

export default Course