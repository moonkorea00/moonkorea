const useHashLink = (slug: string) => {
  const hashLink = `#${slug}`;

  const onScrollWithOffset = () => {
    const elementWithHashLink = document.getElementById(slug);
    if (elementWithHashLink) {
      const yOffset = -60;
      const yPosition =
        elementWithHashLink.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  };

  return { hashLink, onScrollWithOffset };
};

export default useHashLink;
