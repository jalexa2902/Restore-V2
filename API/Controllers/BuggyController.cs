using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")] //code 204 not found
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")] //code 400 bad request
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("unauthorized")] //code unauthorised
        public IActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem 1", "This is the first error");
            ModelState.AddModelError("Problem 2", "This is the second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")] //code 500 server error
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}