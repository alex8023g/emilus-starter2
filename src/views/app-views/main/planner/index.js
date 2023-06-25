import React, { useState } from 'react';
import armchair from './mebelImg/armchair.svg';
import bed from './mebelImg/bed.svg';
import sofa2 from './mebelImg/sofa2.svg';
import sofa3 from './mebelImg/sofa3.svg';
import './styles.css';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// const furnitures = [
//   { id: 1, src: armchair, isSelected: false },
//   { id: 2, src: bed, isSelected: false },
//   { id: 3, src: sofa2, isSelected: false },
//   { id: 4, src: sofa3 },
// ];

export function Planner() {
  const [furnitures, setFurnitures] = useState([
    { id: 1, src: armchair, isSelected: false },
    { id: 2, src: bed, isSelected: false },
    { id: 3, src: sofa2, isSelected: false },
    // { id: 4, src: sofa3 },
  ]);

  const [furnOnPlan, setFurnOnPlan] = useState([]);
  return (
    <>
      <div className='test'>Planner</div>
      <Box display={'flex'} alignItems={'center'}>
        <Paper elevation={5} sx={{ padding: 5, marginRight: 2 }}>
          <ul className='ul'>
            {furnitures.map(({ id, src, isSelected }) => {
              const compClass = isSelected ? 'li selected' : 'li';
              return (
                <li
                  className='li'
                  onClick={(e) => {
                    console.log(id);
                    setFurnitures(
                      furnitures.map((item) =>
                        item.id === id
                          ? { ...item, isSelected: true }
                          : { ...item, isSelected: false }
                      )
                    );
                  }}
                >
                  <img src={src} alt='' className={compClass} />
                </li>
              );
            })}
          </ul>
        </Paper>
        <Button
          variant='contained'
          sx={{ height: 60, marginRight: 2 }}
          onClick={(e) => {
            setFurnOnPlan(
              furnOnPlan.concat([furnitures.find((item) => item.isSelected === true)])
            );
          }}
        >
          {' '}
          {'>'}{' '}
        </Button>
        <Paper elevation={5} sx={{ height: 600, width: 800 }}>
          <div>
            {furnOnPlan.map((item) => (
              <img
                src={item.src}
                alt=''
                onDrag={(e) => {
                  console.log(e.pageX, e.pageY);
                }}
              />
            ))}
          </div>
        </Paper>
      </Box>
    </>
  );
}

export default Planner;
