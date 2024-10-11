import { Flex } from "@mantine/core";
import AllCarsDataTable from "../../components/landing-page/AllCarsDataTable";
import CarFilter from "../../components/landing-page/CarFilter";

const LandingPage = () => {
    return (
        <Flex align="start" gap="xl" w="100%">
            <AllCarsDataTable />
            <CarFilter />
        </Flex>
    );
}

export default LandingPage;