const DataFake = () => {
    return Array.from({length: 100000}, (_, index) => `Item ${index + 1}`);
};

export default DataFake;
