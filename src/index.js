import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
    const course = {
      name:'Half Stack application development',
      parts: [
        { 
          name:'Fundamentals of React',
          exercises: 10
        },
        {
          name:'Using props to pass data',
          exercises: 7
        },
        {
          name:'State of a component',
          exercises: 14
        }
      ]
    }
    
    return (
      <div>
         <Header course={course} />
        
        <Content parts={course.parts} />
        
        <Total parts={course.parts}/>
      </div>
    )
  }

  const  Header = (props) => {
    return (
        <div>
          <h1>
            {props.course.name}
          </h1>
        </div>
      )

  }

  const Content = (props) => {
    return (
        <div>
          <Part part={props.parts[0]}  />
          <Part part={props.parts[1]}  />
          <Part part={props.parts[2]}  />
        </div>
      )
      
}
const Part = (props) => {
  return (
    <div>
          <p>
          {props.part.name} includes {props.part.exercises} exercises
          </p>
        </div>
  )
}

  const Total = (props) => {
    let sum = 0;
    props.parts.forEach( part => {
      sum += part.exercises;
  })
      
    return (
        <div>
          <p>
            The total number of exercises is {sum} 
          </p>
        </div>
      )
      
}
  
  ReactDOM.render(<App />, document.getElementById('root'))
  