import { fetchCategories } from '@/sanity/sanity.query';
import { NavBarLink } from '../links';

const NavLinks = async () => {
  const categories = await fetchCategories();

  return (
    <>
      {categories?.map((category, idx) => (
        <NavBarLink
          title={category.title}
          key={category.title}
        />
      ))}
    </>
  );
};

export default NavLinks;
