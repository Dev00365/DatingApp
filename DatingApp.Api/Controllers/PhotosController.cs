using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Api.Data;
using DatingApp.Api.Dto;
using DatingApp.Api.Helpers;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.Api.Controllers
{
     [Authorize]
     [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        private Cloudinary _Cloudinary;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
           
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
            _cloudinaryConfig.Value.ApiSecret
            );

            _Cloudinary = new Cloudinary(acc);


        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            var photo = _mapper.Map<PhotosFromReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotosForUser([FromRoute] int userId,
        [FromForm]PhotosForCreationDto photosForCreationDto)
        {


            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var userFromRepo = await _repo.GetUser(userId);

            var file = photosForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParms = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _Cloudinary.Upload(uploadParms);
                }
            }

            photosForCreationDto.Url = uploadResult.Uri.ToString();
            photosForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photosForCreationDto);

            if (!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;


            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotosFromReturnDto>(photo);
                return CreatedAtRoute(
                     "GetPhoto",
                    routeValues: new { id = photo.Id },
                    value: photoToReturn);
            }


            return BadRequest("Could not add photo");

        }

[HttpPost("{id}/setMain")]
public async Task<IActionResult> SetMainPhoto(int userId, int id)
{
     if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

    var user =  await _repo.GetUser(userId);

    if(!user.Photos.Any(p => p.Id == id))
    return Unauthorized();

    var photoFromRepo = await _repo.GetPhoto(id);

    if(photoFromRepo.IsMain)
    return BadRequest("This Photo is already main photo");

    var currentMainPhoto = await _repo.GetMainPhoto(userId);

    currentMainPhoto.IsMain = false;

    photoFromRepo.IsMain = true;

    if(await _repo.SaveAll()){
       return NoContent(); 
    } 

    return BadRequest("Could not set photo to main");

}
[HttpDelete("{id}")]
public async Task<IActionResult> deletePhoto(int userId, int id)
{
    if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

    var user =  await _repo.GetUser(userId);

    if(!user.Photos.Any(p => p.Id == id))
    return Unauthorized();

    var photoFromRepo = await _repo.GetPhoto(id);

    if(photoFromRepo.IsMain)
    return BadRequest("This Photo is main photo your are not allowed to delete this!");

    if(photoFromRepo.PublicId != null)
    {
        var deleteParms =  new DeletionParams(photoFromRepo.PublicId);
     
     var result = _Cloudinary.Destroy(deleteParms);


     if(result.Result == "ok")
     {
         _repo.Delete(photoFromRepo);
     }
    }

    if(photoFromRepo.PublicId == null)
    {
        
         _repo.Delete(photoFromRepo);

    }
    
     if(await _repo.SaveAll())
     {
         return Ok();
     }

     return BadRequest("Deletion Failed");

}

   }
}