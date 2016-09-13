export default () => {
  return {
    test: process.env.<%= classname.toUpperCase() %>_TEST || 'test'
  };
};
