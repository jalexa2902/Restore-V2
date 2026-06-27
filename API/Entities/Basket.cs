namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string BasketId { get; set; }
        public List<BasketItem> Items { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            if (product == null) ArgumentNullException.ThrowIfNull(product);
            if (quantity <= 0) throw new ArgumentException("La cantidad debe ser mayor a cero", nameof(quantity));

            var existingItem = FindItem(product.Id);

            if (existingItem == null)
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity,
                });
            }
            else
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("La cantidad debe ser mayor a cero", nameof(quantity));

            var item = FindItem(productId);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity <= 0) Items.Remove(item);
        }

        private BasketItem? FindItem(int productId) //Return the possibly basket item or null if we dont find it
        {
            return Items.FirstOrDefault(item => item.ProductId == productId);
        }
    }
}