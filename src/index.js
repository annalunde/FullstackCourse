import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
  
    return (
      <div>
         <Header course={course} />
        
         <Content partname={part1} exercisesnum={exercises1} />
        
        <Content partname={part2} exercisesnum={exercises2} />
        
        <Content partname={part3} exercisesnum={exercises3} />
        
        <Total totalnum={exercises1 + exercises2 + exercises3}/>
      </div>
    )
  }

  const  Header = (props) => {
    return (
        <div>
          <h1>
            {props.course}
          </h1>
        </div>
      )

  }

  const Content = (props) => {
    return (
        <div>
          <p>
            {props.partname} has {props.exercisesnum} exercises
          </p>
        </div>
      )
      
}

  const Total = (props) => {
    return (
        <div>
          <p>
            The total number of exercises is {props.totalnum} 
          </p>
        </div>
      )
      
}
  
  ReactDOM.render(<App />, document.getElementById('root'))
  

  /*
  const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}*/