using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NoContent();

            return basket.ToDto();
        }
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket([FromQuery] int productId, [FromQuery] int quantity)
        {
            // get basket from database
            var basket = await RetrieveBasket();
            //create a basket
            basket ??= CreateBasket();
            //get product
            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest("Problema al añadir producto al carrito");
            //add item to basket
            basket.AddItem(product, quantity);

            //save changes
            var result = await context.SaveChangesAsync() > 0;

            if (result == true) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

            return BadRequest("Problema al actualizar el carrito");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem([FromQuery] int productId, [FromQuery] int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();

            if (basket == null) return BadRequest("No se pudo cargar el carrito");
            //remove the item to reduce its quantity
            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest("Problema al actualizar el carrito");
        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await context.Baskets
                .Include(x => x.Items)
                .ThenInclude(x => x.Product)
                .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }

        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("basketId", basketId, cookieOptions);
            var basket = new Basket { BasketId = basketId };
            context.Baskets.Add(basket);
            return basket;
        }
    }
}