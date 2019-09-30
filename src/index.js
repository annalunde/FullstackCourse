import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
<button onClick={onClick}>{text}</button>
)
const Anecdote = ({anecdote,points}) => {
  return (
  <div>
    <p>{anecdote}</p> 
    <p>has {points || 0} votes</p>
  </div>
  )
}
const mostVoted = (anecdotes,points) => {
  let highestVotes = 0
  let highestVoted = anecdotes[0]
  for (let i = 0; i < anecdotes.length; i++) {
    if (points[i] > highestVotes) {
      highestVotes = points[i]
      highestVoted = anecdotes[i]
    }
  }
  return {highestVoted, highestVotes}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({})
  
  const handleNextClick = () => {
    const num = getRandomInt(6)
    return (
      <div>
        {setSelected(num)}
      </div>
    )
  }
  const handleVoteClick = () => {
    const copy = {...points}
    const currentVotes = copy[selected] || 0
    copy[selected] = currentVotes + 1 
    setPoints(copy)
  }

  const mostVotedAnec = mostVoted(anecdotes,points)
  return (
    <div>
      <h3>Anecdote of the day</h3>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button onClick={handleNextClick} text='Next anecdote' />
      <Button onClick={handleVoteClick} text='Vote' />
      <h4>Anecdote with most votes</h4>
      <Anecdote anecdote={mostVotedAnec.highestVoted} points={mostVotedAnec.highestVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
