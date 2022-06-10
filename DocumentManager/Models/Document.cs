
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CsvHelper.Configuration;

namespace DocumentManager.Models
{
	[Table("Document")]

	public class Document
	{
		public Document() { }

		public Document(string filePath)
		{
			Name = System.IO.Path.GetFileName(filePath);
			Path = filePath;
		}

		[Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[Required]
		public string? Name { get; set; }
		[Required]
		public string? Path { get; set; }
		public string Category { get; set; } = "Supporting Documents";
    }

	

	public sealed class DocumentClassMap : ClassMap<Document>
	{
		public DocumentClassMap()
		{
			Map(r => r.Id).Name("Id");
			Map(r => r.Name).Name("Name");
			Map(r => r.Path).Name("Path");
			Map(r => r.Category).Name("Category");
		}
	}
}
