import * as S from './PostFilter.style';
import FilterOption from './FilterOption/FilterOption';

import { assets } from '@utils/assetsPath';

interface PostFilterProps {
  options: Record<string, number>;
  isResettable: boolean;
  isOptionSelected: (value: string) => boolean;
  onSetFilter: (value: string) => void;
  onResetFilter: () => void;
}

const PostFilter = ({
  options,
  isResettable,
  isOptionSelected,
  onSetFilter,
  onResetFilter,
}: PostFilterProps) => {
  return (
    <S.Container>
      <S.FilterList>
        {Object.entries(options).map(([tag, count]) => (
          <FilterOption
            key={tag}
            tag={tag}
            count={count}
            isSelected={isOptionSelected(tag)}
            onSetFilter={() => onSetFilter(tag)}
          />
        ))}
      </S.FilterList>
      <S.ResetFilterButton onClick={onResetFilter} shouldRender={isResettable}>
        <img src={assets.reset} alt="초기화" />
        <span>초기화</span>
      </S.ResetFilterButton>
    </S.Container>
  );
};

export default PostFilter;
