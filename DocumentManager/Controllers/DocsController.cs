using DocumentManager.Data;
using DocumentManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DocumentManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocsController : Controller
    {
        private readonly DocDBContext docDBContext;

        private readonly ILogger<DocsController> logger;

        public DocsController(DocDBContext docDBContext, ILogger<DocsController> logger)
        {
            this.docDBContext = docDBContext;
            this.logger = logger;
        }

        // Get All Docs
        [HttpGet]
        public async Task<IActionResult> GetAllDocs()
        {
            logger.LogInformation("Gettin All Them Docs!");
            var documents = await docDBContext.Documents.ToListAsync();
            return Ok(documents);
        }

        [HttpGet]
        [Route("id")]
        [ActionName("GetDoc")]
        [ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDoc([FromRoute] int id)
        {
            logger.LogInformation("Gettin that Doc!");
            var document = await docDBContext.Documents.FindAsync(id);
            return document == null ? NotFound() : Ok(document);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AddDocument([FromBody] Document document)
        {
            logger.LogInformation("Adding that Doc!");

            document.Id = new int();
            await docDBContext.Documents.AddAsync(document);
            await docDBContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDoc) document.Id, document);
        }
    }
}
