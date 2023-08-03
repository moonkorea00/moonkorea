const useScrollToElementByQuerySelector = (selector: string) => {
  const onScroll = () => {
    const element = document.querySelector(selector);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return onScroll;
};

export default useScrollToElementByQuerySelector;
