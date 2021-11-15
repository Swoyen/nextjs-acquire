import classes from "./PlatformSelect.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Select from "react-select";
import { BiError } from "react-icons/bi";
import gsap from "gsap";

const ErrorText = ({ errorRef, platformError }) => {
  useLayoutEffect(() => {
    if (errorRef && platformError) {
      gsap.fromTo(
        errorRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }
  }, [errorRef, platformError]);
  return (
    <span ref={errorRef} className={classes.platformerror}>
      <BiError size="1.5rem" /> Please Select A Platform
    </span>
  );
};

const PlatformSelect = ({
  disabled,
  platforms,
  platformError,
  setPlatformError,
  selectedOption,
  setSelectedOption,
}) => {
  const [options, setOptions] = useState([]);
  const errorRef = useRef(null);

  const handleChange = (e) => {
    setSelectedOption({ value: e.value, label: e.label });
    setPlatformError(false);
  };

  useEffect(() => {
    if (platforms) {
      var o = platforms.map((platform) => {
        return {
          value: platform.platform.slug,
          label: platform.platform.name,
        };
      });
      setOptions(o);
    }
  }, [platforms]);

  return (
    <div className={classes.platformselect}>
      <div className={"label"}>Platform</div>
      <Select
        options={options}
        onChange={handleChange}
        value={selectedOption}
        isDisabled={disabled}
      />
      {platformError && (
        <ErrorText platformError={platformError} errorRef={errorRef} />
      )}
    </div>
  );
};

export default PlatformSelect;
