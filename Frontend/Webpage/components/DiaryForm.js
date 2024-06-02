import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import axiosInstance from '../pages/axiosInstance.js'

const DiaryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // 백엔드에 일기 저장
      const detailResponse = await axiosInstance.post('/diary/', {
        title: data.title,
        content: data.content,
        date: new Date().toISOString(),
      });
      console.log(detailResponse)
      // 목록 페이지로 이동
      router.push('/mypage');
    } catch (error) {
      console.error('Error during diary submission:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            일기 작성
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="일기 제목"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('title', { required: '일기 제목을 입력해주세요.' })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
            <TextField
              label="일기 내용"
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              margin="normal"
              {...register('content', { required: '일기 내용을 입력해주세요.' })}
              error={!!errors.content}
              helperText={errors.content ? errors.content.message : ''}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              완료
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default DiaryForm;
