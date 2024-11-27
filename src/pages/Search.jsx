import { Center, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";


const Search = () => {
    return (
        <>
            <Center>
                <TextInput
                    placeholder="..."
                    rightSectionPointerEvents="none"
                    rightSection={<FaSearch />}
                />
            </Center>
        </>
    );
}

export default Search;
