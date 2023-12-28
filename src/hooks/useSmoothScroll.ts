const useSmoothScroll = () => {
  const onScrollToElement = (
    id: string,
    behavior: ScrollBehavior | undefined = 'smooth'
  ) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior });
  };

  return onScrollToElement;
};

export default useSmoothScroll;
