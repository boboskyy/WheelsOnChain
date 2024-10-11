import { Container } from "@mantine/core"
import { UserHeader } from "./UserHeader"

type TemplateUserViewProps = {
    children: React.ReactNode
}

export const TemplateUserView = ({ children }: TemplateUserViewProps) => {
    return (
        <>
            <Container size={"xl"}>
                <UserHeader />
                {children}
            </Container>
        </>
    )
}