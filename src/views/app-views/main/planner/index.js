import React, { useEffect, useState } from 'react';
import armchair from './mebelImg/armchair.svg';
import bed from './mebelImg/bed.svg';
import sofa2 from './mebelImg/sofa2.svg';
import './styles.css';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { nanoid } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { saveAs } from 'file-saver';

export function Planner() {
  const [furnitures, setFurnitures] = useState([
    { type: 'armchair', src: armchair, isSelected: false },
    { type: 'bed', src: bed, isSelected: false },
    { type: 'sofa2', src: sofa2, isSelected: false },
  ]);

  const [furnOnPlan, setFurnOnPlan] = useState([]);
  const [dragStart, setDragStart] = useState([]);
  const [furnStart, setFurnStart] = useState([]);
  const [boundary, setBoundary] = useState({});

  useEffect(() => {
    const el = document.getElementById('PaperFurnOnPlan');
    const rect = el.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    const { top, right, bottom, left } = rect;
    setBoundary({ top, right, bottom, left });
  }, []);

  return (
    <>
      <div className='test'>Planner</div>
      <Button
        variant='contained'
        sx={{ marginRight: 3 }}
        onClick={(e) => {
          const text = JSON.stringify(furnOnPlan);
          var blob = new Blob([text], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, 'hello world.txt');
        }}
      >
        Сохранить
      </Button>

      <input
        style={{ display: 'none' }}
        accept='.txt'
        // className={classes.input}
        id='contained-button-file'
        multiple
        type='file'
        onChange={(e) => {
          console.log(e.target.files[0]);
          let reader = new FileReader();
          reader.readAsText(e.target.files[0]);
          reader.onload = function () {
            const res = JSON.parse(reader.result);
            setFurnOnPlan(res);
          };
        }}
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Импорт
        </Button>
      </label>
      <Box display={'flex'} alignItems={'center'}>
        <Paper elevation={5} sx={{ padding: 5, marginRight: 2 }}>
          <ul className='ul'>
            {furnitures.map(({ type, src, isSelected }) => {
              const compClass = isSelected ? 'li selected' : 'li';
              return (
                <li
                  className='li'
                  key={type}
                  onClick={(e) => {
                    setFurnitures(
                      furnitures.map((item) =>
                        item.type === type
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
        <Paper elevation={5} sx={{ height: 600, width: 800 }} id='PaperFurnOnPlan'>
          {/* <div> */}
          {furnOnPlan.map((item) => (
            <div
              // src={item.src}
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.left}px`,
                top: `${item.top}px`,
              }}
              draggable={true}
              alt=''
              onDragStart={(e) => {
                setDragStart([e.pageX, e.pageY]);
                setFurnStart([item.left, item.top]);
                return false;
              }}
              onDrag={(e) => {
                console.log(e.pageX, e.pageY);
                if (e.pageX < 1) return;
                const moveX = e.pageX - dragStart[0];
                const moveY = e.pageY - dragStart[1];
                setFurnOnPlan(
                  produce((draft) => {
                    const furn = draft.find((item2) => item2.id === item.id);
                    if (boundary.left > furnStart[0] + moveX + 60) return;
                    if (boundary.left + 400 < furnStart[0] + moveX) return;
                    if (boundary.top > furnStart[1] + moveY + 60) return;
                    if (boundary.top + 400 < furnStart[1] + moveY) return;
                    furn.left = furnStart[0] + moveX;
                    furn.top = furnStart[1] + moveY;
                  })
                );
              }}
            >
              <img src={item.src} alt='' />
            </div>
          ))}
          {/* </div> */}
        </Paper>
      </Box>
    </>
  );
}

export default Planner;
