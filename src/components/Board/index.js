import { Container, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const Item = () => {
    return (
        <Paper elevation={2} sx={{width: "100%",height: 32}}/>
    )
}
export const Board = () => {
    const [gridSize,setGridSize] = useState(3)
    const [inputRow,setInputRow] = useState(0)
    const [targetWord,setTargetWord] = useState('love'.split(''))

    const [keyboardInput, setKeyboardInput] = useState([])
    useEffect(() => {
      if (keyboardInput.length % gridSize === 0 && keyboardInput.length !== 0) {
          console.log('got here')
        setInputRow(prev=>prev+1)
      }
    
      return () => {
        
      };
    }, [keyboardInput]);

    useEffect(() => {

    
      return () => {
        
      };
    }, [inputRow]);
    
    const checkCharacter = (char) => {
        if (!targetWord.includes(char)) return false
        return true
    }

    const checkPlacement = (char,idx) => {
        if (targetWord[idx]===char) return true
        return false
    }

    const getItemClassname = (item,idx) => {
        //check if we are on the right row
        const row = Math.floor(idx/gridSize)

        if (row >= inputRow) return
        if (!checkCharacter(item)) return 'incorrect'
        if (!checkPlacement(item,idx % gridSize)) return 'correct'
        return 'correctlyPlaced'
    }

    const makeSquares = () => {
        let result = []
        for (let i = 0; i < gridSize**2 ; i++) {
            result.push(
                <Grid item xs={12/gridSize}>
                    <Paper key={i} sx={{width: "100%",height: 32, display: 'flex',justifyContent: 'center', alignItems: 'center'}}
                    className={getItemClassname(keyboardInput[i],i)}>{keyboardInput[i]}</Paper>
                </Grid>
            )
        }
        return result
    }

  return (<div>
      <div>
          <TextField onChange={(e)=>setGridSize(e.target.value)}/>
      </div>
      <Container sx={{width: '50vw'}}>
          
      <Grid container spacing={1}>
          {makeSquares()}
        
      </Grid>
      </Container>
      <Container m={2} p={2} sx={{width: '50vw',marginTop: '2rem'}}>

      <Keyboard sx={{marginTop: '2rem'}} onChange={(input) => setKeyboardInput(input)}/>
      </Container>

  </div>);
};
