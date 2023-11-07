const useScrollToHashLink = (slug: string) => {
  const onScrollToHashLink = () => {
    const heading = document.getElementById(slug);
    if (heading) {
      const yOffset = -60;
      const yPosition =
        heading.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  return onScrollToHashLink;
};

export default useScrollToHashLink;
