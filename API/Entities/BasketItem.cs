using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("BasketItems")] //To adjust the table's name
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation properties
        public int ProductId { get; set; }
        public required Product Product { get; set; } = null!;

        //correccion de null en migracion
        public int BasketId { get; set; }
        public Basket Basket { get; set; } = null!;
    }
}