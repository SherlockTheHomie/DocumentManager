using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using DocumentManager.Models;
using DocumentManager.Data;


namespace DocumentManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocsController : Controller
    {

        private readonly ILogger<DocsController> _logger;

        private readonly IWebHostEnvironment _env;

        private readonly IMyDocDataAccessLayer _accessLayer;

        public DocsController(IWebHostEnvironment env, ILogger<DocsController> logger, IMyDocDataAccessLayer accessLayer)
        {
            _env = env;
            _logger = logger;
            _accessLayer = accessLayer;
        }
      
        

        // Get All Docs
        [HttpGet]
        public async Task<ActionResult<List<Document>>> Get()
        {
            try
            {
                var result = await _accessLayer.GetAllDocs();

                return result;
            }

            catch (Exception ex)
            {
                return StatusCode(404, $"Beep boop error: {ex}");
            }
        }

        [HttpGet]
        [Route("{id}")]
        [ActionName("GetDoc")]
        [ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDoc([FromRoute] int id)
        {
            try
            {
                var result = await _accessLayer.GetById(id);


                return Ok(result);
            }

            catch (Exception ex)
            {
                return StatusCode(404, $"Internal server error: {ex}");
            }
        }


        //[HttpPost]
        //[ProducesResponseType(typeof(Document), StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> AddDocument([FromBody] Document document)
        //{
        //    _logger.LogInformation("Adding that Doc!");


        //    await _context.Documents.AddAsync(document);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(Document), document.Id, document);
        //}

        [HttpPost]
        [Route("new")]
        public async Task<IActionResult> UploadDoc(IFormFile file)
        {
            string pathWay = Path.Combine(_env.ContentRootPath, @"assets\Docs\SD\");
            try
            {            
 
                var filePath = Path.Combine(pathWay, file.Name);

                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                var result = _accessLayer.UpdateFileList();


                return Ok(result);
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            string pathWay = Path.Combine(_env.ContentRootPath, @"assets\");
            var selectedDoc = await _accessLayer.GetById(id);
            try
            {
                if (selectedDoc != null)
                {
                    var docPath = selectedDoc.Path;

                    //var filePath = docPath.Replace(@"\", @"/");

                    var absolutePath = Path.Combine(pathWay, docPath);

                    Console.WriteLine("Here I Am!");

                    bool status = await _accessLayer.DestroyDocument(absolutePath);

                    Console.WriteLine(absolutePath);

                    if (status == true)
                    {
                        var result = await _accessLayer.DeleteFile(id);

                        Console.WriteLine("Now I am Here!");


                        return Ok(result);
                    }

                    else
                    {
                        return StatusCode(500);
                    }
                }
                else
                {
                    return StatusCode(404);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }

    }
}
