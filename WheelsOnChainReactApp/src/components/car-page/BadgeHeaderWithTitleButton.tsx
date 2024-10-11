import { Button, Card, Group } from '@mantine/core'
import classes from './styles/BadgeHeaderWithTitle.module.css'

type BadgeHeaderWithTitleProps = {
  title: string
  onClick?: () => void
}

const BadgeHeaderWithTitleButton = ({ title, onClick }: BadgeHeaderWithTitleProps) => {
  return (
    <Card className={classes.card} fw={'bold'}>
      <Group justify="space-between">
        {title}
        <Button type="submit" fz={'xl'} size="sm" onClick={onClick}>
          +
        </Button>
      </Group>
    </Card>
  )
}

export default BadgeHeaderWithTitleButton
