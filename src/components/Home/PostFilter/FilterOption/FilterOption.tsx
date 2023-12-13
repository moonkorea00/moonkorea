import * as S from './FilterOption.style';

interface FilterItemProps {
  tag: string;
  count: number;
  isSelected?: boolean;
  toggleTag: () => void;
}

const FilterOption = ({
  tag,
  count,
  isSelected,
  toggleTag,
}: FilterItemProps) => {
  return (
    <S.Option onClick={toggleTag} isSelected={isSelected}>
      {tag} <span>({count})</span>
    </S.Option>
  );
};

export default FilterOption;
