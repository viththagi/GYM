import { React, useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, Stack } from '@mui/material'

import { exerciseoptions,fetchData } from '../utils/fetchData'

const SearchExercises = () => {
  const [search, setsearch] = useState('')

  const HandleSearch = async () => {
    if (search) {
      const excercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseoptions)

        console.log(excercisesData)
    }
  }
  return (
    <Stack
      alignItems={'center'}
      mt={'37px'}
      justifyContent={'none'}
      padding={'20px'}
    >
      <Typography
        fontWeight={'700'}
        sx={{ fontSize: { lg: '44px', xs: '30px' }, marginBottom: '20px', textAlign: 'center' }}
      >
        Awesome Exercises You <br />Should know
      </Typography>
      <Box position={'relative'} mb={'10px'}>
        <TextField
          sx={{
            input: {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px'
            },
            width: {
              lg: '800px', xs: '350px',
              backgroundColor: '#ffffff',
              borderRadius: '40px'
            }
          }}
          height={'70px'}
          value={search}
          onChange={(e) => setsearch(e.target.value.toLowerCase())}
          placeholder='Search Exercises'
          type="text"
        />
        <Button className='search-btn'
          sx={{
            //variant:'contained',
            bgcolor: '#ff2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '100px' },
            fontSize: { lg: '24px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={HandleSearch}
        >search</Button>
      </Box>

    </Stack>
  )
}

export default SearchExercises