import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";
import CustomDialog from "../../common/components/CustomDialog";
import useGetAllTokens from "../../common/hook/useGetAllTokens";
import useGetAvatarToken from "../../common/hook/useGetAvatarToken";
import useGetBalanceTokens from "../../common/hook/useGetBalanceTokens";
import { BaseCurrency } from "../../common/utils";

const CurrencyRow = (props) => {
  const { data, index, style, onClick, selected, active, chainId } = props;

  const { balance = 0, loading } = useGetBalanceTokens({
    token: data?.[index],
    chainId: chainId,
  });

  const { avatar } = useGetAvatarToken({
    symbol: data[index].symbol,
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingX: 2,
        "&:hover": { bgcolor: "action.hover" },
        paddingRight: 2,
        opacity: active ? 0.5 : 1,
        paddingY: 2,
        cursor: selected ? "unset" : "pointer",
      }}
      style={style}
      onClick={() => {
        !selected && onClick(data[index]);
      }}
    >
      <Avatar style={{ height: 24, width: 24 }} src={avatar} />
      <Box marginLeft={1} flex={1}>
        <Typography variant="subtitle2">{data[index]?.symbol}</Typography>
        <Typography variant="caption" color="textSecondary">
          {data[index]?.name}
        </Typography>
      </Box>
      {loading ? (
        <CircularProgress style={{ height: 24, width: 24 }} />
      ) : (
        <Typography variant="subtitle1">{balance}</Typography>
      )}
    </Box>
  );
};

const outerElementType = forwardRef((props, ref: any) => (
  <div ref={ref} {...props} />
));

interface Props {
  open: boolean;
  chainId: number;
  onClose: () => void;
  listCurrency?: (BaseCurrency | null)[];
  selectedCurrency?: BaseCurrency | null;
  onSelectCurrency: (currency: BaseCurrency) => void;
}

const SelectTokenDialog = (props: Props) => {
  const {
    open,
    onClose,
    onSelectCurrency,
    listCurrency,
    selectedCurrency,
    chainId,
  } = props;

  const [searchKey, setSearch] = useState<string>("");
  const { tokens } = useGetAllTokens({ chainId });

  const mappedTokens = useMemo(() => {
    return tokens.filter((token) => {
      if (searchKey?.trim()) {
        return (
          token.name.toLowerCase().includes(searchKey?.toLowerCase()?.trim()) ||
          token.symbol.toLowerCase().includes(searchKey?.toLowerCase()?.trim())
        );
      }
      return true;
    });
  }, [searchKey, tokens]);

  const Row = useCallback(
    function TokenRow(props) {
      const { data, index } = props;
      return (
        <CurrencyRow
          key={index}
          onClick={onSelectCurrency}
          {...props}
          active={
            listCurrency?.findIndex(
              (cur) => cur?.address === data[index]?.address
            ) !== -1
          }
          selected={selectedCurrency?.address === data[index]?.address}
          chainId={chainId}
        />
      );
    },
    [onSelectCurrency, listCurrency, selectedCurrency?.address, chainId]
  );

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title={
        <Typography variant="body1" style={{ marginTop: 12 }} component="div">
          Select a token
        </Typography>
      }
      PaperProps={{
        style: { width: 480 },
      }}
    >
      <Box padding={2}>
        <TextField
          fullWidth
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={"Search name or paste address"}
          inputProps={{
            style: { height: 36 },
          }}
          InputProps={{
            style: { paddingLeft: 8, paddingRight: 8 },
          }}
        />
      </Box>
      <Divider />
      <List
        className="List"
        height={450}
        itemCount={mappedTokens.length}
        itemSize={62}
        outerElementType={outerElementType}
        width={"100%"}
        itemData={mappedTokens}
      >
        {Row}
      </List>
    </CustomDialog>
  );
};
export default SelectTokenDialog;
