import { Card } from '@mantine/core'
import classes from './styles/BadgeHeaderWithTitle.module.css'

type BadgeHeaderWithTitleProps = {
  title: string
}

const BadgeHeaderWithTitle = ({ title }: BadgeHeaderWithTitleProps) => {
  return (
    <Card className={classes.card} fw={'bold'}>
      {title}
    </Card>
  )
}

export default BadgeHeaderWithTitle
