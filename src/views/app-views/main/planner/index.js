import React, { useState } from 'react';
import armchair from './mebelImg/armchair.svg';
import bed from './mebelImg/bed.svg';
import sofa2 from './mebelImg/sofa2.svg';
import sofa3 from './mebelImg/sofa3.svg';
import './styles.css';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { nanoid } from '@reduxjs/toolkit';
import { produce } from 'immer';

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
                  key={id}
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
              furnOnPlan.concat([
                {
                  ...furnitures.find((item) => item.isSelected === true),
                  left: 500,
                  top: 200,
                  id: nanoid(),
                },
              ])
            );
          }}
        >
          {' '}
          {'>'}{' '}
        </Button>
        <Paper elevation={5} sx={{ height: 600, width: 800 }}>
          {/* <div> */}
          {furnOnPlan.map((item) => (
            <img
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.left}px`,
                top: `${item.top}px`,
              }}
              draggable={true}
              src={item.src}
              alt=''
              onDrag={(e) => {
                console.log(e.pageX, e.pageY);
                if (e.pageX < 1) return;
                setFurnOnPlan(
                  produce((draft) => {
                    const furn = draft.find((item2) => item2.id === item.id);
                    furn.left = e.pageX;
                    furn.top = e.pageY;
                  })
                );
              }}
            />
          ))}
          {/* </div> */}
        </Paper>
      </Box>
    </>
  );
}

export default Planner;
