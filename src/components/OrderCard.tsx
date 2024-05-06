import { useAppSelector } from "@/store/hook";
import { OrderItem } from "@/types/order";
import { Box, Card, MenuItem, Select, Typography } from "@mui/material";
import { AddonCategory, ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleOrderStatusUpdate?: (itemId: string, status: ORDERSTATUS) => void;
}

const OrderCard = ({ orderItem, isAdmin, handleOrderStatusUpdate }: Props) => {
  const addonCategories = useAppSelector(
    (state) => state.addonCategory.addonCategories
  );

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: ".6rem",
        width: 280,
        height: 280,
        mt: 2,
        mr: 2,
      }}>
      <Box
        sx={{
          height: 40,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "primary.dark",
          color: "white",
          alignItems: "center",
          px: 1,
        }}>
        <Typography>{orderItem.menu.name}</Typography>
        <Typography>{orderItem.table.name}</Typography>
      </Box>
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            height: 250 * 0.15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
          }}>
          <Typography sx={{ fontWeight: "bold" }}>Item Id: </Typography>
          <Typography>{orderItem.itemId}</Typography>
        </Box>
        <Box sx={{ height: 250 * 0.6, overflowY: "scroll" }}>
          {orderItem.orderAddons.length > 0 ? (
            orderItem.orderAddons.map((orderAddon) => {
              const addonCategory = addonCategories.find(
                (item) => item.id === orderAddon.addonCategoryId
              ) as AddonCategory;
              return (
                <Box key={addonCategory.id} sx={{ mb: 2 }}>
                  <Typography>{addonCategory.name}</Typography>
                  {orderAddon.addons.map((addon) => {
                    return (
                      <Typography
                        key={addon.id}
                        sx={{
                          fontSize: 14,
                          ml: 2,
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}>
                        {addon.name}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
              <Typography>No addon</Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            height: 250 * 0.23,
            borderTop: "1px solid lightgray",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Typography sx={{ fontWeight: "bold" }}>Status: </Typography>
          {isAdmin ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}>
              <Select
                value={orderItem.status}
                onChange={(evt) =>
                  handleOrderStatusUpdate &&
                  handleOrderStatusUpdate(
                    orderItem.itemId,
                    evt.target.value as ORDERSTATUS
                  )
                }
                sx={{ maxHeight: 30 }}>
                <MenuItem value={ORDERSTATUS.PENDING}>
                  {ORDERSTATUS.PENDING}
                </MenuItem>
                <MenuItem value={ORDERSTATUS.COOKING}>
                  {ORDERSTATUS.COOKING}
                </MenuItem>
                <MenuItem value={ORDERSTATUS.COMPLETE}>
                  {ORDERSTATUS.COMPLETE}
                </MenuItem>
              </Select>
            </Box>
          ) : (
            <Typography>{orderItem.status}</Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default OrderCard;
