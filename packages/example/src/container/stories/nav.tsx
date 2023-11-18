import type {FC} from 'react';
import {BoxClasses} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {classNames} from '@xorkevin/nuke/computil';

const Story: FC = () => {
  return (
    <div className={classNames(NavClasses.Sidebar, BoxClasses.PadSmall)}>
      <NavList matchesAriaCurrent="page" aria-label="Stories navigation">
        <NavList.Group heading="Some components">
          <NavList.Link href="one">One</NavList.Link>
          <NavList.SubNav heading="Two">
            <NavList.Link href="two/alpha">Two alpha</NavList.Link>
            <NavList.SubNav heading="Two beta">
              <NavList.Link href="two/beta/1">Two beta 1</NavList.Link>
              <NavList.Link href="two/beta/2">Two beta 2</NavList.Link>
            </NavList.SubNav>
          </NavList.SubNav>
        </NavList.Group>
        <NavList.Divider />
        <NavList.Group heading="Moar components">
          <NavList.Link href="three">Three</NavList.Link>
          <NavList.Link href="four">Four</NavList.Link>
        </NavList.Group>
      </NavList>
    </div>
  );
};

export default Story;
