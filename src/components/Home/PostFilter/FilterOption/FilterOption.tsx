import * as S from './FilterOption.style';

interface FilterItemProps {
  tag: string;
  count: number;
  isSelected: boolean;
  onSetFilter: () => void;
}

const FilterOption = ({
  tag,
  count,
  isSelected,
  onSetFilter,
}: FilterItemProps) => {
  return (
    <S.Option onClick={onSetFilter} isSelected={isSelected}>
      {tag} <span>({count})</span>
    </S.Option>
  );
};

export default FilterOption;
