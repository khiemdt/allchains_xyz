import { FormattedNumber, FormatNumberOptions } from "react-intl";

interface Props extends FormatNumberOptions {
  value: string | number;
}

const CurrencyFormatted = (props: Props) => {
  const { value, ...rest } = props;
  return (
    <>
      $<FormattedNumber value={value ? Number(value) : 0} {...rest} />
    </>
  );
};

export default CurrencyFormatted;
