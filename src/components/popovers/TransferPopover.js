import { useState, useRef } from 'react';

import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import infoIcon from '../../images/icons/info-icon.svg';

const TransferPopover = ({ item }) => {
  const [popoverShow, setPopoverShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [imgHover, setImgHover] = useState(false);
  const ref = useRef(null);

  const handlePopoverClick = (event) => {
    setPopoverShow(!popoverShow);
    setTarget(event);
  };

  return (
    <div ref={ref}>
      <img
        src={infoIcon}
        alt="info"
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
        onClick={(e) => handlePopoverClick(e.target)}
        id="img-trigger"
      />

      <Overlay
        rootClose={imgHover ? false : true}
        onHide={() => handlePopoverClick(target)}
        show={popoverShow}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={10}
      >
        <Popover
          id="popover-positioned-bottom"
          className="card-popover card-popover__transfer"
        >
          <Popover.Body>
            <p>
              <span style={{ color: '#B5B5B5' }}>Владелец:</span> {item.owner}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
};

export default TransferPopover;
