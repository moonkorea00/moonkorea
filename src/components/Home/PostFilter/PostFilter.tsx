import * as S from './PostFilter.style';
import FilterOption from './FilterOption/FilterOption';

import { assets } from '@utils/assetsPath';

interface PostFilterProps {
  tags: { tag: string; count: number }[];
  selectedTags?: string | string[];
  toggleTag: (key: string, value: string) => void;
  reset: () => void;
}

const PostFilter = ({
  tags,
  selectedTags,
  toggleTag,
  reset,
}: PostFilterProps) => {
  return (
    <S.Container>
      <S.FilterList>
        {tags.map(({ tag, count }) => (
          <FilterOption
            key={tag}
            tag={tag}
            count={count}
            isSelected={selectedTags?.includes(tag)}
            toggleTag={() => toggleTag('tags', tag)}
          />
        ))}
      </S.FilterList>
      <S.ResetFilterButton onClick={reset} shouldRender={selectedTags}>
        <img src={assets.reset} alt="초기화" />
        <span>초기화</span>
      </S.ResetFilterButton>
    </S.Container>
  );
};

export default PostFilter;
