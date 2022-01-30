import { Button, ButtonGroup, Container, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { threeDict } from '../../dictionary/3dict';
import { fourDict } from '../../dictionary/4dict';
import { fiveDict } from '../../dictionary/5dict';
import { sixDict } from '../../dictionary/6dict';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const Item = () => {
    return (
        <Paper elevation={2} sx={{width: "100%",height: 50,width: 50,border: '2px solid black'}}/>
    )
}
export const Board = () => {
    const [gridSize,setGridSize] = useState(3)
    const [inputRow,setInputRow] = useState(0)
    const [targetWord,setTargetWord] = useState(null)


    const getTargetWord = () => {

        switch(gridSize) {
            case 3:

                setTargetWord(Object.keys(threeDict)[Math.floor(Math.random() * Object.keys(threeDict).length)].split(''))
                break;
            case 4:

                setTargetWord(Object.keys(fourDict)[Math.floor(Math.random() * Object.keys(fourDict).length)].split(''))
                break;
            case 5:
                setTargetWord(Object.keys(fiveDict)[Math.floor(Math.random() * Object.keys(threeDict).length)].split(''))
                break;
            case 6:
                console.log('ot here')
                setTargetWord(Object.keys(sixDict)[Math.floor(Math.random() * Object.keys(sixDict).length)].split(''))
                break;
        
            default:
                console.log('default')
                break;
        }
        
        
    }
    const [keyboardInput, setKeyboardInput] = useState('')

    useEffect(() => {
      getTargetWord()
    
      return () => {

      };
    }, [gridSize]);
    
    useEffect(() => {
      if (keyboardInput.length % gridSize === 0 && keyboardInput.length !== 0) {

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

        if (row >= inputRow) {
            return
        }
        if (!checkCharacter(item)) {

            return 'gridItem incorrect'
        }
        if (!checkPlacement(item,idx % gridSize)) {

            return 'gridItem correct'
    }

        return 'gridItem correctlyPlaced'
    }

    const makeSquares = () => {
        let result = []
        for (let i = 0; i < gridSize**2 ; i++) {
            result.push(
                <Grid  sx={{padding:0}} item xs={12/gridSize}>
                    <Paper key={i} sx={{marginLeft: 0,margingRight: 0,height: 50, width: 50, border: '2px solid black', display: 'flex',justifyContent: 'center', alignItems: 'center'}}
                    className={getItemClassname(keyboardInput[i],i)}>{keyboardInput[i]}</Paper>
                </Grid>
            )
        }
        return result
    }
    
    console.log(targetWord)

  return (<div>
      
      <Container sx={{width: '50vw',marginTop: '50px'}}>
      <ButtonGroup sx={{display: 'flex',justifyContent: 'center',marginBottom: '50px'}} variant="text" aria-label="text button group">
  <Button onClick={() => setGridSize(3)}>3</Button>
  <Button onClick={() => setGridSize(4)}>4</Button>
  <Button onClick={() => setGridSize(5)}>5</Button>
  <Button onClick={() => setGridSize(6)}>6</Button>
  <Button onClick={()=>{
          setKeyboardInput([])
          getTargetWord()
          }}>reset</Button>
</ButtonGroup>
      <Grid container spacing={1}>
          {makeSquares()}
        
      </Grid>
      </Container>
      <Container m={2} p={2} sx={{width: '50vw',marginTop: '2rem'}}>

      <Keyboard 
      sx={{marginTop: '2rem'}} 
      onChange={(input) => setKeyboardInput(input)}
      theme={"hg-theme-default hg-layout-default myTheme"}
          layoutName={"default"}
          layout={{
            default: [
              
              "q w e r t y u i o p {bksp}",
              "a s d f g h j k l {enter}",
              "z x c v b n m",
              
            ],
            
          }}
          
      
      />
      </Container>
      

  </div>);
};
