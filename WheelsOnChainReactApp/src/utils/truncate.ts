const getFormattedAddress = (address: string, size: number = 6) => {
    if (address && address.length >= 8) {
        const firstSix = address.substring(0, size);
        const lastFour = address.substring(address.length - (size - 2));
        return `${firstSix}...${lastFour}`;
    } else {
        return 'Invalid Address';
    }
};

export default getFormattedAddress;