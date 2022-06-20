using System;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using DocumentManager.Models;
using DocumentManager.Data;

using System.ComponentModel.DataAnnotations;

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

        public class UploadData
        {
            [Required(ErrorMessage = "Please input file name")]
            [StringLength(500, ErrorMessage = "{0} cannot be greater than {1} characters.")]
            public string? FileName { get; set; }

            [Required(ErrorMessage = "Please input file type")]
            [StringLength(50, ErrorMessage = "{0} cannot be greater than {1} characters.")]
            
            public string? FileType { get; set; }

            [Required(ErrorMessage = "Please upload pdf file")]
            public IFormFile? File { get; set; }
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
        [Route("upload")]
        [ActionName("UploadDoc")]
        public async Task<IActionResult> UploadDoc([FromForm] UploadData formData)
        {
            string pathWay = Path.Combine(_env.ContentRootPath, @"assets\Docs\SD\");

            if (formData.File == null)
            {
                return new UnsupportedMediaTypeResult();
            }
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var docName = formData.FileName;
                var docType = formData.FileType;
                var docPath = Path.Combine(@"Docs\SD\", docName);

                Console.WriteLine(docName);
                Console.WriteLine(docType);
                Console.WriteLine(docPath);

                var filePath = Path.Combine(pathWay, docName);
                Console.WriteLine(filePath);
                var filename = Path.GetFileName(filePath);

                
                Console.WriteLine(filename);


                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                await _accessLayer.AddDoc(docName, docPath);

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
                    string docPath = selectedDoc.Path;

                    Console.WriteLine("Path property of selected doc");
                    Console.WriteLine(docPath);

                    var absolutePath = Path.Combine(pathWay, docPath);

                    Console.WriteLine("Absolute PATH");
                    Console.WriteLine(absolutePath);

                    bool status = await _accessLayer.DestroyDocument(absolutePath);


                    if (status == true)
                    {
                        var result = await _accessLayer.DeleteFile(id);

                        Console.WriteLine("Now I am Here!");


                        return Ok(result);
                    }

                    else
                    {
                        var result = await _accessLayer.DeleteFile(id);
                        return Ok(result);
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
