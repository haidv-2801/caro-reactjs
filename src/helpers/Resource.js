import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import MediaServicesPreselectedIcon from '@atlaskit/icon/glyph/media-services/preselected';

const Resource = {};

/**
 * Lượt người chơi
 * DVHAI 29/07/2021
 */
Resource.Player = {
  Player1: true,
  Player2: false,
};

/**
 * Kết quả cuộc chơi
 * DVHAI 29/07/2021
 */
Resource.GameResult = {
  Win: '{0} THẮNG',
  Draw: 'HÒA',
};

/**
 * Icon
 * DVHAI 29/07/2021
 */
Resource.Icon = {
  CHERVON_DOWN: <HipchatChevronDownIcon css={{ cursor: 'pointer' }} />,
  X: <CrossIcon size="large" primaryColor="red" />,
  O: <MediaServicesPreselectedIcon size="large" primaryColor="#4fff4f" />,
};

export default Resource;
