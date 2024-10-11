import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core'
import classes from './styles/LoginPage.module.css'
import { TSignInFormFields, postSignIn, signInSchema } from '../../app/api/admin-page/SignIn'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import useAdminStore from '../../app/store/useAdminStore'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { setAdminAuth } = useAdminStore()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: postSignIn,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        setAdminAuth({ id: data.user.id, email: data.user.email, token: data.token })
        navigate('/admin/panel')
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInFormFields>({ resolver: yupResolver(signInSchema) })

  const onSubmit: SubmitHandler<TSignInFormFields> = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        This is admin panel of WheelsOnChain. Please sign in to continue.
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            {...register('email')}
            error={errors.email && errors.email.message}
            label="Email"
            placeholder="you@mantine.dev"
            required
          />
          <PasswordInput
            {...register('password')}
            error={errors.password && errors.password.message}
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
