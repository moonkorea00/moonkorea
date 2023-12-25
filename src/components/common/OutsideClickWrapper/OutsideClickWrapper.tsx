import useKeyPress from '@hooks/useKeyPress';
import useOnClickOutside from '@hooks/useOnClickOutside';

interface OutsideClickWrapperProps {
  onClickHandler: VoidFunction;
  triggerKey?: string;
}

const OutsideClickWrapper = ({
  onClickHandler,
  triggerKey,
  children,
}: PropsWithStrictChildren<OutsideClickWrapperProps>) => {
  const wrapperRef = useOnClickOutside<HTMLDivElement>(onClickHandler);

  if (triggerKey) useKeyPress({ [triggerKey]: onClickHandler });

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickWrapper;
